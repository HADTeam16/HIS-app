import {
    Component,
    ElementRef,
    Input,
    SimpleChange,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
    selector: 'app-canvas',
    templateUrl: './canvas.component.html',
    styleUrl: './canvas.component.css',
})
export class CanvasComponent {
    @Input() height = '1000';
    @Input() width = '750';
    @Input() pen_state = 'write';

    @ViewChild('prescriptionPad') canvasEl: ElementRef<HTMLCanvasElement>;
    signaturePad: SignaturePad;

    ngAfterViewInit() {
        this.signaturePad = new SignaturePad(this.canvasEl.nativeElement, {
            backgroundColor: 'white',
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        let pen_state_change: SimpleChange = changes['pen_state'];
        if (this.signaturePad && pen_state_change) {
            if (pen_state_change.currentValue == 'write') {
                this.signaturePad.penColor = 'black';
            } else if (pen_state_change.currentValue == 'erase') {
                this.signaturePad.penColor = 'white';
            }
        }
    }

    clearPad() {
        this.signaturePad.clear();
    }

    onSavePrescription(): string {
        return this.signaturePad.toDataURL('image/jpeg', 1);
        // this.downloadImage(
        //     this.signaturePad.toDataURL('image/jpeg', 1),
        //     'prescription.jpg'
        // );
    }

    // downloadImage(dataUrl: string, filename: string) {
    //     const a = document.createElement('a');
    //     a.href = dataUrl;
    //     a.download = filename;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    // }
}
