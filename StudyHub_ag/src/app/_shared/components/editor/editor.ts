import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { debounceTime, Subject, Subscription } from 'rxjs';
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Bold,
  Italic,
  Undo,
  Heading,
  Link,
  List,
  // Image,
  // ImageToolbar,
  // ImageCaption,
  // ImageStyle,
  // ImageUpload,
  BlockQuote,
  Table,
  TableToolbar,
  MediaEmbed,
  EditorConfig
} from 'ckeditor5';

@Component({
  selector: 'app-editor',
  imports: [CKEditorModule],
  templateUrl: './editor.html',
  styleUrl: './editor.css',
})
export class Editor implements OnInit, OnDestroy {

  @Input() content = '';
  @Input() placeholder = '';
  @Input() readonly = false;

  @Output() contentChange = new EventEmitter<string>();

  public editor = ClassicEditor;
  public config!: EditorConfig;

  private changeSubject = new Subject<string>();
  private changeSub?: Subscription;

  ngOnInit(): void {
    // Khởi tạo config trong ngOnInit để @Input() placeholder đã được Angular set
    this.config = {
      licenseKey: 'GPL',

      plugins: [
        Essentials,
        Paragraph,
        Heading,
        Bold,
        Italic,
        Link,
        List,

        // Image,
        // ImageToolbar,
        // ImageCaption,
        // ImageStyle,
        // ImageUpload,

        BlockQuote,

        Table,
        TableToolbar,

        MediaEmbed,

        Undo
      ],

      toolbar: [
        'heading',
        '|',
        'bold',
        'italic',
        'link',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        // 'insertImage',
        'blockQuote',
        'insertTable',
        'mediaEmbed',
        '|',
        'undo',
        'redo',
      ],

      placeholder: this.placeholder || 'Nhập nội dung tại đây...',

      // image: {
      //   toolbar: [
      //     'imageTextAlternative',
      //     'toggleImageCaption',
      //     'imageStyle:inline',
      //     'imageStyle:block',
      //     'imageStyle:side'
      //   ]
      // },

      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      },
    };

    // Debounce 400ms: chỉ emit sau khi người dùng dừng gõ
    this.changeSub = this.changeSubject
      .pipe(debounceTime(400))
      .subscribe((html) => {
        console.log(html);
        this.contentChange.emit(html);
      });
  }

  ngOnDestroy(): void {
    this.changeSub?.unsubscribe();
  }

  // event.editor là đúng API của @ckeditor/ckeditor5-angular
  // event.editorInstance là undefined → getData() trả về ''
  onChange(event: any) {
    const html: string = event.editor?.getData() ?? '';
    this.changeSubject.next(html);
  }
}
