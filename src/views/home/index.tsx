import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import logo from '@/assets/logo.png';
import XHello from '@/components/hello';
import XCMEditor from '@/components/cmeditor';

@Component
export default class ViewHome extends Vue {
  private text = `
  <?xml version="1.0" encoding="UTF-8"?><jmeterTestPlan version="1.2" properties="4.0" jmeter="4.0 r1823414">
  <hashTree>
    <TestPlan guiclass="TestPlanGui" testclass="TestPlan" testname="Test Plan" enabled="true">
      <stringProp name="TestPlan.comments"/>
      <boolProp name="TestPlan.functional_mode">false</boolProp>
      <boolProp name="TestPlan.tearDown_on_shutdown">true</boolProp>
      <boolProp name="TestPlan.serialize_threadgroups">false</boolProp>
      <elementProp name="TestPlan.user_defined_variables" elementType="Arguments" guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments"/>
      </elementProp>
      <stringProp name="TestPlan.user_define_classpath"/>
    </TestPlan>
    <hashTree>
      <ThreadGroup guiclass="ThreadGroupGui" testclass="ThreadGroup" testname="Thread Group" enabled="true">
        <stringProp name="ThreadGroup.on_sample_error">continue</stringProp>
        <elementProp name="ThreadGroup.main_controller" elementType="LoopController" guiclass="LoopControlPanel" testclass="LoopController" testname="Loop Controller" enabled="true">
          <boolProp name="LoopController.continue_forever">false</boolProp>
          <stringProp name="LoopController.loops">1</stringProp>
        </elementProp>
        <stringProp name="ThreadGroup.num_threads">1</stringProp>
        <stringProp name="ThreadGroup.ramp_time">1</stringProp>
        <boolProp name="ThreadGroup.scheduler">false</boolProp>
        <stringProp name="ThreadGroup.duration"/>
        <stringProp name="ThreadGroup.delay"/>
      </ThreadGroup>
      <hashTree>
        
        
        
        
        
        
        
        
      <CounterConfig guiclass="CounterConfigGui" testclass="CounterConfig" testname="计数器" enabled="true">
          <stringProp name="CounterConfig.start">1</stringProp>
          <stringProp name="CounterConfig.end">1111</stringProp>
          <stringProp name="CounterConfig.incr">1</stringProp>
          <stringProp name="CounterConfig.name"/>
          <stringProp name="CounterConfig.format"/>
          <boolProp name="CounterConfig.per_user">false</boolProp>
        </CounterConfig><hashTree/><TransactionController guiclass="TransactionControllerGui" testclass="TransactionController" testname="192.168.0.1下单点点滴滴的请求33333333" enabled="true"><boolProp name="TransactionController.includeTimers">false</boolProp><boolProp name="TransactionController.parent">true</boolProp></TransactionController><hashTree><HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="192.168.0.1下单点点滴滴的请求33333333" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">192.168.0.200</stringProp>
          <stringProp name="HTTPSampler.port">31026</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"/>
          <stringProp name="HTTPSampler.path">/order</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"/>
          <stringProp name="HTTPSampler.connect_timeout"/>
          <stringProp name="HTTPSampler.response_timeout"/>
        </HTTPSamplerProxy><hashTree><ConstantTimer guiclass="ConstantTimerGui" testclass="ConstantTimer" testname="Constant Timer" enabled="true">
    <stringProp name="ConstantTimer.delay">0</stringProp>
</ConstantTimer></hashTree></hashTree><TransactionController guiclass="TransactionControllerGui" testclass="TransactionController" testname="192.168.0.2" enabled="true"><boolProp name="TransactionController.includeTimers">false</boolProp><boolProp name="TransactionController.parent">true</boolProp></TransactionController><hashTree><HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="192.168.0.2" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">192.168.0.200</stringProp>
          <stringProp name="HTTPSampler.port">31026</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"/>
          <stringProp name="HTTPSampler.path">/order</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"/>
          <stringProp name="HTTPSampler.connect_timeout"/>
          <stringProp name="HTTPSampler.response_timeout"/>
        </HTTPSamplerProxy><hashTree><ConstantTimer guiclass="ConstantTimerGui" testclass="ConstantTimer" testname="Constant Timer" enabled="true">
    <stringProp name="ConstantTimer.delay">0</stringProp>
</ConstantTimer></hashTree></hashTree><TransactionController guiclass="TransactionControllerGui" testclass="TransactionController" testname="192.168.0.1下单点点滴滴的请求33333335555" enabled="true"><boolProp name="TransactionController.includeTimers">false</boolProp><boolProp name="TransactionController.parent">true</boolProp></TransactionController><hashTree><HTTPSamplerProxy guiclass="HttpTestSampleGui" testclass="HTTPSamplerProxy" testname="192.168.0.1下单点点滴滴的请求33333335555" enabled="true">
          <elementProp name="HTTPsampler.Arguments" elementType="Arguments" guiclass="HTTPArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
            <collectionProp name="Arguments.arguments"/>
          </elementProp>
          <stringProp name="HTTPSampler.domain">192.168.0.200</stringProp>
          <stringProp name="HTTPSampler.port">31026</stringProp>
          <stringProp name="HTTPSampler.protocol">http</stringProp>
          <stringProp name="HTTPSampler.contentEncoding"/>
          <stringProp name="HTTPSampler.path">/order</stringProp>
          <stringProp name="HTTPSampler.method">GET</stringProp>
          <boolProp name="HTTPSampler.follow_redirects">true</boolProp>
          <boolProp name="HTTPSampler.auto_redirects">false</boolProp>
          <boolProp name="HTTPSampler.use_keepalive">true</boolProp>
          <boolProp name="HTTPSampler.DO_MULTIPART_POST">false</boolProp>
          <stringProp name="HTTPSampler.embedded_url_re"/>
          <stringProp name="HTTPSampler.connect_timeout"/>
          <stringProp name="HTTPSampler.response_timeout"/>
        </HTTPSamplerProxy><hashTree><ConstantTimer guiclass="ConstantTimerGui" testclass="ConstantTimer" testname="Constant Timer" enabled="true">
    <stringProp name="ConstantTimer.delay">0</stringProp>
</ConstantTimer></hashTree></hashTree></hashTree>
      <Arguments guiclass="ArgumentsPanel" testclass="Arguments" testname="User Defined Variables" enabled="true">
        <collectionProp name="Arguments.arguments">
          <elementProp name="1" elementType="Argument">
            <stringProp name="Argument.name">1</stringProp>
            <stringProp name="Argument.value">3333</stringProp>
            <stringProp name="Argument.desc">哈哈哈</stringProp>
            <stringProp name="Argument.metadata">=</stringProp>
          </elementProp>
        </collectionProp>
      </Arguments>
      <hashTree/>
    </hashTree>
  </hashTree>
</jmeterTestPlan>
`.trim();

  private mounted() {
    // setInterval(() => {
    //   this.text += '\nconsole.log(1);';
    // }, 1000);
  }

  public render(): VNode {
    return (
      <div class={style.view}>
        {/* <img src={logo} />
        <br />
        <span>这是我的主页</span>
        <br />
        <XHello />
        <br /> */}
        <div class={style.box}>
          <XCMEditor text={this.text} />
        </div>
      </div>
    );
  }
}
