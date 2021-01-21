import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import logo from '@/assets/logo.png';
import XHello from '@/components/hello';
import XCodeEditor from '@/components/codeEditor';

@Component
export default class ViewHome extends Vue {

  private code = `
import io.gatling.app.Script
import io.gatling.core.Predef._
import io.gatling.core.structure.ChainBuilder
import io.gatling.http.Predef._
import scala.concurrent.duration._
/*
* @author 杭州笨马网络技术有限公司 dev的trace-mock压测脚本
* @version V1.0 2019-05-21 09:22:03 新建脚本
*
*/

class Main3sWEo2FRS4PtAITBaZ1D7FCT extends Script {

val httpConfig = http
.acceptHeader("application/json, text/plain, */*")
.acceptEncodingHeader("gzip, deflate")
.acceptLanguageHeader("zh-CN,zh;q=0.9,en;q=0.8")
.userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.162 Safari/537.36")


val init: ChainBuilder = exec()


example:

val action: ChainBuilder = group("order") {
exec(http("order").get("http://trace.dev.perfma-inc.net:31026/order").check(status in 200))
}.group("placeOrder"){
  exec(http("placeOrder").get("http://trace.dev.perfma-inc.net:31028/placeOrder?uid=1&gid=0").check(status in 200))
}
val action: ChainBuilder = 
  group("placeOrder"){
  exec(http("placeOrder").get("http://trace.dev.perfma-inc.net:31028/placeOrder?uid=1&gid=0").check(status in 200))
}.
  group("getStock"){
  exec(http("getStock").get("http://trace.dev.perfma-inc.net:31027/getStock?goodsId=1").check(status in 200))
}
group("orderYapi"){
  exec(http("order").get("http://192.168.0.191:31026/orderYapi"))
  exec(http("getStock").get("http://192.168.0.37:31027/getStock?goodsId=1"))
}
  


setUp(
scenario("Main3sWEo2FRS4PtAITBaZ1D7FCT")
.exec(
exitBlockOnFail(init).exitHereIfFailed,
exitBlockOnFail(action)
)
.inject(atOnceUsers(1))
.protocols(httpConfig)
)
.maxDuration(500 minutes)
}    
`.trim();

  private mounted() {
    // setInterval(() => {
    //   this.code += 'console.log(123);\n';
    // }, 1000);
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        <XCodeEditor
          v-model={this.code}
        />
        {/* <img src={logo} />
        <br />
        <span>这是我的主页</span>
        <br />
        <XHello /> */}
      </div>
    );
  }
}
