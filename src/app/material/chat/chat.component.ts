import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    SimpleChanges,
    ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.css',
})
export class ChatComponent {
    @Input() chat = 'invisible';
    @Output() chatClosed = new EventEmitter<string>();
    @ViewChild('container') container: ElementRef;
    wasInside: boolean;
    messageControl = new FormControl('');
    avatars = {
        'Dr.House': 'assets/avatars/bot.png',
        'Dr.Mike': 'assets/avatars/doc1.png',
        'Dr.Kelly': 'assets/avatars/doc2.png',
        'Dr.Johnson': 'assets/avatars/doc3.png',
    };
    user = { name: 'Dr.Mike', photo: this.avatars['Dr.Mike'] };
    messages = [
        {
            align: 'self-start',
            name: 'Dr.House',
            photo: this.avatars['Dr.House'],
            text: 'Welcome to hospital chat forum! This is open to all hospital members.',
            msgtime: new Date().toLocaleString('en-US'),
        },
        {
            align: 'self-start',
            name: 'Dr.Johnson',
            photo: this.avatars['Dr.Johnson'],
            text: "Dr.Mike and Dr.Kelly please meet me in the office to discuss yesterday's case developments.",
            msgtime: new Date().toLocaleString('en-US'),
        },
        {
            align: 'self-end',
            name: 'Dr.Mike',
            photo: this.avatars['Dr.Mike'],
            text: 'On my way',
            msgtime: new Date().toLocaleString('en-US'),
        },
        {
            align: 'self-start',
            name: 'Dr.Kelly',
            photo: this.avatars['Dr.Kelly'],
            text: "I'm in the ER",
            msgtime: new Date().toLocaleString('en-US'),
        },
    ];

    @HostListener('click')
    clickInside() {
        this.wasInside = true;
    }

    @HostListener('document:click')
    clickout() {
        if (!this.wasInside) {
            this.chat = 'invisible';
            this.chatClosed.emit(this.chat);
        }
        this.wasInside = false;
    }

    ngOnChanges(changes: SimpleChanges) {
        this.chat = changes['chat'].currentValue;
        if (this.chat == 'visible') this.wasInside = true;
    }

    onSendMessage() {
        this.messages.push({
            ...this.user,
            align: 'self-end',
            text: this.messageControl.value,
            msgtime: new Date().toLocaleString('en-US'),
        });
        this.messageControl.reset();
        setTimeout(() => {
            this.container.nativeElement.scrollTop =
                this.container.nativeElement.scrollHeight;
        }, 0);
    }
}
