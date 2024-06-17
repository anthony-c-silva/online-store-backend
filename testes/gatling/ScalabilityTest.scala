package computerdatabase

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import scala.concurrent.duration._

class ScalabilityTest extends Simulation {

  val httpProtocol = http
    .baseUrl("http://localhost:3000")
    .inferHtmlResources()
    .acceptHeader("application/json")

  val scn = scenario("Adicionar Produtos")
    .exec(
      http("Adicionar Produto")
        .post("/products")
        .header("Content-Type", "application/json")
        .body(StringBody(session => s"""{
            "name": "Produto ${session("counter").as[Int]}",
            "price": ${scala.util.Random.nextInt(100)}.99,
            "description": "Descrição do produto ${session("counter").as[Int]}"
          }""")).asJson
        .check(status.is(201))
    ).exec(session => session.set("counter", session("counter").asOption[Int].getOrElse(0) + 1))

  setUp(
    scn.inject(
      incrementUsersPerSec(10)
        .times(40)
        .eachLevelLasting(15 seconds)
        .startingFrom(100 usersPerSec)
    ).protocols(httpProtocol)
  )
}
