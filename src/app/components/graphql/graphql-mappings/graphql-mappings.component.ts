import { Component, OnInit } from '@angular/core';
import { NgxEditorModel } from 'ngx-monaco-editor';

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

  constructor() { }

  ngOnInit(): void {
  }


  logMappings(editor: any) {
    try {
      console.log(JSON.parse(editor._value));

    } catch(err) {
      console.error(err)
    }
  }

}
