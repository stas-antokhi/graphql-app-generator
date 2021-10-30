import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-graphql-descriptor',
  templateUrl: './graphql-descriptor.component.html',
  styleUrls: ['./graphql-descriptor.component.scss']
})
export class GraphqlDescriptorComponent implements OnInit, OnDestroy {

  @Output() validForm = new EventEmitter<boolean>();

  descriptorForm!: FormGroup;

  statusSub!: Subscription;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.descriptorForm = this.fb.group({
      description: [''],
      uri: ['', Validators.required],
      name: ['', Validators.required],
      enabled: [true]
    });

    this.statusSub = this.descriptorForm.statusChanges.subscribe(
      status => this.validForm.emit(status === 'VALID')
    );
  }

  ngOnDestroy() {
    this.statusSub.unsubscribe();
  }

}
