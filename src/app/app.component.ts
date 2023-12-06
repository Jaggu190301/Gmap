import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GMap';

  SearchLocation:any={
    startDate: '2023-11-25 16:41:36.370',
    endDate: '2023-12-01 16:55:24.893'
  
  }
 
  center: google.maps.LatLngLiteral = {lat:0,lng:0}; 

  constructor(private http:HttpClient) {}
  ngOnInit() {
    
  }
  display: any; // Property to store latitude and longitude data from the map

  
  //zoom = 10; // Initial zoom level for the map
  move(event: google.maps.MapMouseEvent) {
    // Method to handle map click event and update the display property
    if (event.latLng != null) {
      this.display = event.latLng.toJSON();
    }
  }
  addMarker(event: google.maps.MapMouseEvent) {
    
    

  }
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];


  Search(){
    const Url='https://external.balajitransports.in/api/Long/GetLocation';

    let headers = new HttpHeaders();
      headers= headers.set('Content-Type','application/json; charset=utf-8');      

    return this.http.post(Url,JSON.stringify(this.SearchLocation),{headers}).subscribe((data:any)=>{
      console.log(data)
      for (const item of data) {
        const longitude = parseFloat(item.Longitude);
        const latitude = parseFloat(item.Latitude);

        // Check if conversion is successful and lat/lng are valid numbers
        if (!isNaN(longitude) && !isNaN(latitude)) {
          const centerObject: google.maps.LatLngLiteral = { lat: latitude, lng: longitude };
          this.markerPositions.push(centerObject);
        } else {
          console.error('Invalid lat/lng values:', item);
        }
      }
      const mid= Math.floor(data.length / 2);
      console.log((data[mid].Latitude))
      this.center= { lat: parseFloat(data[mid].Latitude), lng: parseFloat(data[mid].Longitude) };
      

    });
  }

}
