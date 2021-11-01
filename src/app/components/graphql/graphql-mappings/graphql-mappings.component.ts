import {  Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getModelMarkers } from 'src/app/monaco-config/monaco-editor-config';
import { ModelMarker } from 'src/app/shared/models/json-schema';

@Component({
  selector: 'app-graphql-mappings',
  templateUrl: './graphql-mappings.component.html',
  styleUrls: ['./graphql-mappings.component.scss']
})
export class GraphqlMappingsComponent implements OnInit {

  editorOptions = {
    theme: 'vs-dark',
    language: 'json'
  }

  @Output() isMappingsValid = new EventEmitter<boolean>(false);
  @Output() stepNext = new EventEmitter<void>();

  @Input() mappings!: any;
  @Output() mappingsChange = new EventEmitter<any>();

  constructor(private dialog: MatDialog) { }


  ngOnInit(): void {
    if(!this.mappings) {
      this.mappings = `{\n\n}`;
    }
  }


  checkForErrors() {
    const markers = getModelMarkers();

    if(markers.length !== 0) {
      this.isMappingsValid.emit(false);
      this.dialog.open(MappingsErrorDialog, {
        data: {
          markers
        }
      });
    } else {
      this.isMappingsValid.emit(true);
      this.mappingsChange.emit(this.mappings);
      setTimeout(() => this.stepNext.emit(), 0);
    }
  }

}

@Component({
  selector: 'app-mappings-error-dialog',
  styles: [],
  template: `
    <h1>Your mappings contain the following errors.</h1>

    <div class="my-6">
     <div *ngFor="let marker of data.markers">
       <pre>{{marker.message}}</pre>
     </div>
    </div>

    <p>
      If you need help please check out the <a class="text-accent-500" href="https://restheart.org/docs/graphql/#mappings">documentation</a>.
    </p>

    <div class="flex justify-center mt-5">
      <button class="bg-primary-500 px-6 py-2 text-gray-200 rounded shadow" (click)="closeDialog()">Ok</button>
    </div>
  `
})
export class MappingsErrorDialog {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {markers: ModelMarker[]},
    public dialogRef: MatDialogRef<MappingsErrorDialog>
  ) {
    console.log(this.data.markers)
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
