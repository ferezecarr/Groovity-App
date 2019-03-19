import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log('Spotify Service listo');
  }

  getQuery(query: string) {
    const url = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      // tslint:disable-next-line:max-line-length
      Authorization: 'Bearer BQAAd00w_h7tk7ZRF8EToU5ueludVfqBJwX0IwnYN0ygcLkQJgEio8pdvqhrsbBsLAoCHWNsNutFc-bCSEY'
    });
    return this.http.get(url, { headers });
  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      // tslint:disable-next-line:no-string-literal
      .pipe(map( data => data['albums'].items ));
  }

  getArtistas(termino: string) {
    return this.getQuery(`search?q=${ termino }&type=artist&limit=15`)
      // tslint:disable-next-line:no-string-literal
      .pipe(map( data => data['artists'].items ));
  }

  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
      // tslint:disable-next-line:no-string-literal
      // .pipe(map( data => data['artists'].items ));
  }

  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      // tslint:disable-next-line:no-string-literal
       .pipe(map(data => data['tracks'].items));
  }
}
