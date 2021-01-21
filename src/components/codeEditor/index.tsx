import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import * as monaco from 'monaco-editor';

@Component
export default class XCodeEditor extends Vue {
  /**
   * 内容（双向绑定）
   */
  @Prop({ default: '' }) private readonly value!: string;
  /**
   * 当前语法支持
   */
  @Prop({ default: 'scala' }) private readonly lang!: string;
  /**
   * 是否只读
   */
  @Prop({ default: false }) private readonly readonly!: boolean;

  private code = '';

  @Watch('value', { immediate: true })
  private handleValueChange(nv: string) {
    if (nv !== this.code) {
      this.code = nv;
      this.editor?.getModel()?.setValue(this.code);
    }
  }

  private editor!: monaco.editor.IStandaloneCodeEditor;

  @Emit('input')
  private emitInput(nv: string) {
    return nv;
  }

  @Emit('change')
  private emitChange(nv: string) {
    return nv;
  }

  private initEditor() {
    this.editor = monaco.editor.create(this.$el as any, {
      language: this.lang,
      value: this.code,
      fontSize: 17,
      tabSize: 2,
    });
    this.editor.getModel()?.onDidChangeContent((e) => {
      this.code = this.editor.getValue();
      this.emitInput(this.code);
      this.emitChange(this.code);
    });
  }

  private mounted() {
    this.initEditor();
  }

  public render(): VNode {
    return (
      <div
        class={style.com}>
        <div
          class={style.container}>
        </div>
      </div>
    );
  }
}
