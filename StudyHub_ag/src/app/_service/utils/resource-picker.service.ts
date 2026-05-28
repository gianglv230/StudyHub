import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export type SelectionMode = 'single' | 'multiple';

@Injectable({
    providedIn: "root"
})
export class ResourcePickerService {

  selectedResources$ = new BehaviorSubject<ChildrenResourceResponse[]>([]);
  selectionMode$ = new BehaviorSubject<SelectionMode>('multiple');

  setMode(mode: SelectionMode) {
    this.selectionMode$.next(mode);
  }

  add(resource: ChildrenResourceResponse) {
    if (this.selectionMode$.value === 'single') {
      // Single mode: replace bất kể đang chọn gì
      this.selectedResources$.next([resource]);
      return;
    }

    const current = this.selectedResources$.value;
    const exists = current.some((r) => r.id === resource.id);
    if (exists) return;
    this.selectedResources$.next([...current, resource]);
  }

  remove(resourceId: number) {
    const filtered = this.selectedResources$.value.filter(
      (r) => r.id !== resourceId
    );
    this.selectedResources$.next(filtered);
  }

  toggle(resource: ChildrenResourceResponse) {
    const exists = this.selectedResources$.value.some(
      (r) => r.id === resource.id
    );

    if (exists) {
      // Single mode: bỏ chọn khi click lại
      this.remove(resource.id);
    } else {
      this.add(resource);
    }
  }

  clear() {
    this.selectedResources$.next([]);
  }
}