import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import XCodeEditor from '@/components/codeEditor';

@Component
export default class XTsApiHelper extends Vue {

  private form: any = {};

  private rules: any = {
    name: [{ required: true, message: '请输入群组名称', trigger: 'blur', }],
  };

  public render(): VNode {
    return (
      <div class={style.com}>
        <div class={style.left}>
          <a-form-model
            ref="form"
            props={{
              model: this.form,
            }}
            rules={this.rules}
            layout="vertical">
            <a-form-model-item
              label="请求地址">
              <a-input
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
                v-model={this.form.responseJSON}
              />
            </a-form-model-item>
            <a-form-model-item
              label="Request JSON（接口请求的JSON数据，可不填）"
              prop="requestJSON">
              <XCodeEditor
                lang="json"
                v-model={this.form.requestJSON}
              />
            </a-form-model-item>
          </a-form-model>
        </div>
        <div class={style.middle}>
          <a-affix offsetTop={203}>
            <a-button type="primary">
              <span>生成</span>
              <a-icon type="right" />
            </a-button>
          </a-affix>
        </div>
        <div class={style.right}>
          <a-form-model
            ref="form"
            props={{
              model: this.form,
            }}
            rules={this.rules}
            layout="vertical">
            <a-form-model-item
              label="生成状态"
              prop="name">
              <a-input
                v-model={this.form.name}
                placeholder="请输入请求地址"
              />
            </a-form-model-item>
            <a-form-model-item
              label="类型声明代码"
              prop="name">
              <XCodeEditor
                lang="json"
                v-model={this.form.responseJSON}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（定义API）"
              prop="responseJSON">
              <XCodeEditor
                lang="json"
                v-model={this.form.responseJSON}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（使用API）"
              prop="requestJSON">
              <XCodeEditor
                lang="json"
                v-model={this.form.requestJSON}
              />
            </a-form-model-item>
            <a-form-model-item
              label="代码样例（引入具体类型）"
              prop="requestJSON">
              <XCodeEditor
                lang="json"
                v-model={this.form.requestJSON}
              />
            </a-form-model-item>
          </a-form-model>
        </div>
      </div>
    );
  }
}
