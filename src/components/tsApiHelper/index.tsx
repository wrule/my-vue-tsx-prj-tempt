/* eslint-disable */
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import XCodeEditor from '@/components/codeEditor';
import Shuji from '@wrule/shuji';
import URIJS from 'urijs';
import { IFormOut } from '@/model/formOut';
import { IFormIn } from '@/model/iFormIn';
import { Generate } from '@/model/generator';
import { IConfig } from '@/model/iConfig';

@Component
export default class XTsApiHelper extends Vue {

  private shuji = new Shuji();

  private config: IConfig = {
    decName: 'D',
    apiName: 'API',
    axiosName: 'http',
    apiPathTrimNum: 1,
  };

  private formIn: IFormIn = {
    apiMethod: 'get',
    apiPath: '',
    rspJson: JSON.stringify(JSON.parse(
      `{"extParams":{},"object":{"defaultScriptType":"JMETER","isOnline":false,"isProtect":true,"pressAppId":"15100275897401344"},"success":true}`
    ), null, 2),
    reqJson: '',
    customName: '',
  };

  private formOut: IFormOut = {
    decCode: '',
    defCode: '',
    useCode: '',
    importCode: '',
  };

  private rules: any = {
    apiPath: [{ required: true, message: '请输入请求地址', trigger: 'blur', }],
    rspJson: [{ required: true, message: '请输入响应JSON', trigger: 'blur', }],
  };

  private handleGenerateClick() {
    (this.$refs.formIn as any).validate((valid: any) => {
      console.log(valid);
      if (valid) {
        this.formOut = Generate(this.formIn, this.config);
        this.$notification.success({
          message: 'API代码生成成功',
          description: '可根据需要复制到项目中',
        });
      }
      return !!valid;
    });
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
                  v-model={this.formIn.apiMethod}
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
                v-model={this.formIn.rspJson}
              />
            </a-form-model-item>
            <a-form-model-item
              label="Request JSON（接口请求的JSON数据，如不需要建立入参模型可不填）"
              prop="requestJSON">
              <XCodeEditor
                lang="json"
                v-model={this.formIn.reqJson}
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
                v-model={this.formIn.customName}
                placeholder="请输入定制化名称"
              />
            </a-form-model-item>
            <a-form-model-item
              label="类型声明代码">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.decCode}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（定义API）">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.defCode}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（使用API）">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.useCode}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（引入具体类型）">
              <XCodeEditor
                lang="typescript"
                v-model={this.formOut.importCode}
              />
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    );
  }
}
