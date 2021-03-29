import { Component } from '@angular/core';
import firebase from '@firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: "AIzaSyATxxjK3AtvJTNi_Sm8nKX2LHOJeAI7Nz8",
      authDomain: "library-8f7cf.firebaseapp.com",
      projectId: "library-8f7cf",
      storageBucket: "library-8f7cf.appspot.com",
      messagingSenderId: "1062675302826",
      appId: "1:1062675302826:web:46e93bf99818622f2703d3",
      measurementId: "G-TGR5DM0BZ8"
    };
    firebase.initializeApp(config);
  }
}
