import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subject, Observable } from 'rxjs';
import { FaceSnap } from '../../../core/models/face-snap.model';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit, OnDestroy {


  faceSnaps$!: Observable<FaceSnap[]>
  private destroy$!: Subject<boolean>;

  constructor(private faceSnapsService: FaceSnapsService) { }

  ngOnInit(): void {
    this.destroy$ = new Subject<boolean>();
    //this.faceSnaps = this.faceSnapsService.getAllFaceSnaps();
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();

    interval(1000).pipe(
      takeUntil(this.destroy$),
      tap(console.log)
    ).subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    }
}
