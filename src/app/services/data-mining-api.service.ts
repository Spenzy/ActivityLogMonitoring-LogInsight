import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SentimentalAnalysisData} from "../views/pages/charts-graphs/sentimental-analysis/SentimentalAnalysisData";

@Injectable({
  providedIn: 'root'
})
export class DataMiningAPIService {

  private baseUrl = environment.dataMiningAPI; // replace with your Flask web application URL

  constructor(private http: HttpClient) {
  }

  public getSentimentalAnalysis(): Observable<SentimentalAnalysisData[]> {
    return this.http.post<any>(`${this.baseUrl}/SentimentalAnalysis/`, {});
  }

  public getCAHSegmentation(): Observable<any[]> {
    return this.http.post<any>(`${this.baseUrl}/CAHSegmentation/`, {});
  }

  public predictCluster(dataVolume: number, jobDuration: number, nbrComponent: number): Observable<any> {
    const payload = { "dataVolume": dataVolume, "jobDuration":jobDuration, "nbrComponent":nbrComponent };

    return this.http.post<any>(`${this.baseUrl}/PredictCluster/`, payload);
  }

  public predictDuration(dataVolume: number, nbrComponent: number): Observable<any> {
    const payload = { "dataVolume": dataVolume, "nbrComponent":nbrComponent };
    console.log(payload)
    return this.http.post<any>(`${this.baseUrl}/PredictDuration/`, payload);
  }
}
