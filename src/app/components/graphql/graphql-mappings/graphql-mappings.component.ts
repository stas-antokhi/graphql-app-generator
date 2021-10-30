import { Component, OnInit } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';
import { MonacoEditorService } from 'src/app/core/services/monaco-editor.service';
import { updateSchema } from 'src/app/monaco-config/monaco-graphql-config';

@Component({
  selector: 'app-graphql-mappings',
  templateUrl: './graphql-mappings.component.html',
  styleUrls: ['./graphql-mappings.component.scss']
})
export class GraphqlMappingsComponent implements OnInit {

  model: NgxEditorModel = {
    value: '',
    language: 'json'
  }

  editorOptions = {
    theme: 'vs-dark',
    language: 'json'
  }

  constructor() { }

  ngOnInit(): void {
  }


}
