import { Component, Vue, Prop, Watch, Emit } from 'vue-property-decorator';
import { VNode } from 'vue';
import style from './index.module.scss';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';

// 语法高亮支持
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml.js';
import 'codemirror/mode/clike/clike.js';
import 'codemirror/mode/sql/sql.js';
import 'codemirror/mode/shell/shell.js';

// 代码折叠支持
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/fold/brace-fold.js';
import 'codemirror/addon/fold/comment-fold.js';
import 'codemirror/addon/fold/foldcode.js';
import 'codemirror/addon/fold/foldgutter.js';
import 'codemirror/addon/fold/indent-fold.js';
import 'codemirror/addon/fold/markdown-fold.js';
import 'codemirror/addon/fold/xml-fold.js';

import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/xml-hint.js';
import 'codemirror/addon/hint/sql-hint.js';
import 'codemirror/addon/hint/anyword-hint.js';

@Component
export default class XCMEditor extends Vue {
  @Prop({ default: '' }) private readonly text!: string;
  @Prop({ default: 'text/html' }) private readonly mode!: string;

  private codeMirror!: CodeMirror.EditorFromTextArea;

  @Watch('text')
  private handleTextChange(nv: string) {
    this.setValue(nv);
  }

  private setValue(nv: string) {
    this.codeMirror.setValue(nv);
    this.emitInput(nv);
  }

  private innerText = '';

  @Emit('input')
  private emitInput(nv: string) {
    return nv;
  }

  private mounted() {
    const textarea = this.$el.querySelector('textarea');
    if (textarea) {
      this.codeMirror = CodeMirror.fromTextArea(textarea, {
        lineNumbers: true,
        matchBrackets: true,
        mode: this.mode,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      } as any);
      this.setValue(this.text)
      this.codeMirror.on('change', (codeMirror) => {
        this.emitInput(codeMirror.getValue());
      });
    }
  }

  public render(): VNode {
    return (
      <div class={style.com}>
        <textarea v-model={this.innerText} />
      </div>
    );
  }
}
