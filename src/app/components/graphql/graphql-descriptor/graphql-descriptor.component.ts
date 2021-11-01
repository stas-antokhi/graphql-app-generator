import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Graphql } from 'src/app/shared/models/GraphQLApp';

@Component({
  selector: 'app-graphql-descriptor',
  templateUrl: './graphql-descriptor.component.html',
  styleUrls: ['./graphql-descriptor.component.scss']
})
export class GraphqlDescriptorComponent implements OnInit {

  @Output() validForm = new EventEmitter<boolean>();

  @Output() stepNext = new EventEmitter<void>();

  @Input() descriptor!: Graphql.Descriptor;
  @Output() descriptorChange = new EventEmitter<Graphql.Descriptor>();

  descriptorForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.descriptorForm = this.fb.group({
      description: [''],
      uri: ['', Validators.required],
      name: ['', Validators.required],
      enabled: [true]
    });

    if(this.descriptor) {
      const {description, uri, name, enabled} = this.descriptor;
      this.descriptorForm.setValue({description, uri, name, enabled});
    }
  }

  onNextStep() {
    if(this.descriptorForm.valid) {
      this.validForm.emit(true);
      this.descriptorChange.emit(this.descriptorForm.value);
      setTimeout(() => this.stepNext.emit(), 0);
    }
  }

}
