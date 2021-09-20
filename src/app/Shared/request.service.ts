import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class reqestService {
    constructor(private httpClient: HttpClient) { }

    getInfo(): Observable<string>{
        return this.httpClient.get<string>('http://localhost:3000/initial')
    }

}