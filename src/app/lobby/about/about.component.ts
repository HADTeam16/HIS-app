import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  selectedIndex: number = 0;

  slides = [
    {
      title: 'Best Free Clinic. Website Template.',
      description: 'Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble.',
      reference: 'Matthew 6:34',
      background: 'assets/images/slider_1.jpg'
    },
    {
      title: 'You are in the Right Place at the Right Time',
      description: 'Therefore do not be anxious about tomorrow, for tomorrow will be anxious for itself. Sufficient for the day is its own trouble.',
      reference: 'Matthew 6:34',
      background: 'assets/images/slider_1.jpg'
    }
  ];

  features = [
    {
      icon: 'local_hospital',
      title: 'Newest Technologies',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.'
    },
    {
      icon: 'person',
      title: 'Experienced Doctors',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.'
    },
    {
      icon: 'local_hospital',
      title: 'High Customer Satisfaction',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.'
    },
    {
      icon: 'local_pharmacy',
      title: 'Pharma Pipeline',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.'
    },
    {
      icon: 'local_drink',
      title: 'Pharma Team',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.'
    },
    {
      icon: 'thumb_up',
      title: 'High Quality Treatments',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut erat nec leo lobortis blandit.'
    }
  ];

  teamMembers = [
    { name: 'David Kanuel', role: 'Facial Surgeon', image: 'assets/images/team-memb1.jpg' },
    { name: 'David Kanuel', role: 'Facial Surgeon', image: 'assets/images/team-memb2.jpg' },
    { name: 'David Kanuel', role: 'Facial Surgeon', image: 'assets/images/team-memb3.jpg' },
    { name: 'David Kanuel', role: 'Facial Surgeon', image: 'assets/images/team-memb4.jpg' }
  ];
  
  constructor() { }
  ngOnInit(): void {
  }
}
