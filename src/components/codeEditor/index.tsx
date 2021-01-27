/* eslint-disable */
import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import * as Monaco from 'monaco-editor';
import { setLocaleData } from 'monaco-editor-nls';
import zhHans from 'monaco-editor-nls/locale/zh-hans.json';
setLocaleData(zhHans);
const monaco = require('monaco-editor/esm/vs/editor/editor.api');

@Component
export default class XCodeEditor extends Vue {
  /**
   * 内容（双向绑定）
   */
  @Prop({ default: '' }) private readonly value!: string;
  /**
   * 当前语法支持
   */
  @Prop({ default: '' }) private readonly lang!: string;
  /**
   * 是否只读
   */
  @Prop({ default: false }) private readonly readonly!: boolean;

  private code = '';

  private editor!: Monaco.editor.IStandaloneCodeEditor;

  @Watch('value', { immediate: true })
  private handleValueChange(nv: string) {
    if (nv !== this.code) {
      this.code = nv;
      this.editor?.getModel()?.setValue(this.code);
    }
  }

  @Watch('lang')
  private handleLangChange(nv: string) {
    const model = this.editor.getModel();
    if (model) {
      monaco.editor.setModelLanguage(model, nv);
    }
  }

  @Watch('readonly')
  private handleReadOnlyChange(nv: boolean) {
    this.editor.updateOptions({
      readOnly: nv,
    });
  }

  @Emit('input')
  private emitInput(nv: string) {
    return nv;
  }

  @Emit('change')
  private emitChange(nv: string) {
    return nv;
  }

  @Emit('blur')
  private emitBlur() { }

  /**
   * 初始化编辑器组件
   */
  private initEditor() {
    this.editor = monaco.editor.create(this.$el as any, {
      language: this.lang,
      value: this.code,
      fontSize: 17,
      tabSize: 2,
      readOnly: this.readonly,
    });
    this.editor.getModel()?.onDidChangeContent(() => {
      this.code = this.editor.getValue();
      this.emitInput(this.code);
      this.emitChange(this.code);
    });
    this.editor.onDidBlurEditorWidget(() => {
      this.emitBlur();
    });
  }

  private mounted() {
    this.initEditor();
  }

  public render(): VNode {
    return (
      <div
        class={style.com}
        onBlur={() => console.log(1234)}>
        <div
          class={style.container}>
        </div>
      </div>
    );
  }
}
