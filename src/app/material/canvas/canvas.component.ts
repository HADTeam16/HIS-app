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
    @Input() width = '950';
    @Input() pen_state = 'write';

    @ViewChild('prescriptionPad') canvasEl: ElementRef;
    signaturePad: SignaturePad;

    ngAfterViewInit() {
        this.signaturePad = new SignaturePad(this.canvasEl.nativeElement);
    }

    ngOnChanges(changes: SimpleChanges) {
        let pen_state_change: SimpleChange = changes['pen_state'];
        if (this.signaturePad) {
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

    onSavePrescription() {
        const dataURL = this.signaturePad.toDataURL();
        console.log(dataURL);
    }
}
