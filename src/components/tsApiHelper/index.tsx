/* eslint-disable */
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import XCodeEditor from '@/components/codeEditor';
import Shuji from '@wrule/shuji';

@Component
export default class XTsApiHelper extends Vue {

  private shuji = new Shuji();

  private formIn = {
    apiPath: '',
    responseJSON: JSON.stringify(JSON.parse(
      `{"extParams":{},"object":{"defaultScriptType":"JMETER","isOnline":false,"isProtect":true,"pressAppId":"15100275897401344"},"success":true}`
    ), null, 2),
    requestJSON: '',
  };

  private rules: any = {
    apiPath: [{ required: true, message: '请输入请求地址', trigger: 'blur', }],
    responseJSON: [{ required: true, message: '请输入Response JSON', trigger: 'blur', }],
  };

  private formOut = {
    decApiCode: '',
    exDefApiCode: '',
    exUseApiCode: '',
    exImportCode: '',
  };

  private handleGenerateClick() {
    this.formOut.decApiCode = '';
    const structRsp = this.shuji.Infer(
      `${this.autoApiName}Rsp`,
      JSON.parse(this.formIn.responseJSON),
    );
    this.formOut.decApiCode += structRsp.TsTestCode;
    if (this.formIn.requestJSON.trim()) {
      const structReq = this.shuji.Infer(
        `${this.autoApiName}Req`,
        JSON.parse(this.formIn.requestJSON),
      );
      this.formOut.decApiCode += `\n\n${structReq.TsTestCode}`;
    }
  }

  private get autoApiName() {
    const segs = this.formIn.apiPath.split(/[\\\/]+/);
    return segs[segs.length - 1] || 'myApi';
  }

  public render(): VNode {
    return (
      <div class={style.com}>
        <div class={style.left}>
          <a-form-model
            ref="formIn"
            props={{
              model: this.formIn,
            }}
            rules={this.rules}
            layout="vertical">
            <a-form-model-item
              label="请求地址"
              prop="apiPath">
              <a-input
                v-model={this.formIn.apiPath}
                placeholder="请输入请求地址 如：xsea/scene/querySceneDetail">
                <a-select
                  slot="addonBefore"
                  default-value="post"
                  style="width: 90px">
                  <a-select-option value="post">
                    POST
                  </a-select-option>
                  <a-select-option value="get">
                    GET
                  </a-select-option>
                  <a-select-option value="put">
                    PUT
                  </a-select-option>
                  <a-select-option value="delete">
                    DELETE
                  </a-select-option>
                </a-select>
              </a-input>
            </a-form-model-item>
            <a-form-model-item
              label="Response JSON（接口返回的JSON数据）"
              prop="responseJSON">
              <XCodeEditor
                lang="json"
                v-model={this.formIn.responseJSON}
              />
            </a-form-model-item>
            <a-form-model-item
              label="Request JSON（接口请求的JSON数据，可不填）"
              prop="requestJSON">
              <XCodeEditor
                lang="json"
                v-model={this.formIn.requestJSON}
              />
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class={style.middle}>
          <a-affix offsetTop={203}>
            <a-button
              type="primary"
              onClick={this.handleGenerateClick}>
              <span>生成</span>
              <a-icon type="right" />
            </a-button>
          </a-affix>
        </div>
        <div class={style.right}>
          <a-form-model
            ref="formOut"
            layout="vertical">
            <a-form-model-item
              label="生成名称"
              prop="name">
              <a-input
                placeholder="请输入定制化名称"
              />
            </a-form-model-item>
            <a-form-model-item
              label="类型声明代码">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.decApiCode}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（定义API）">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.exDefApiCode}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（使用API）">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.exUseApiCode}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（引入具体类型）">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.exImportCode}
              />
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    );
  }
}
