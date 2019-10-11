import { Resource } from '../interfaces/resource.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Serializer } from '../interfaces/serializer.interface';
import { map } from 'rxjs/operators';

export class ResourceService<T extends Resource> {
  constructor(
      private httpClient: HttpClient,
      private url: string,
      private endpoint: string,
      private serializer: Serializer<T>) {}

    public create(item: T): Observable<T> {
      return this.httpClient
        .post<T>(`${this.url}/${this.endpoint}`, this.serializer.toJson(item))
        .pipe(map(data => this.serializer.fromJson(data) as T));
    }

    public update(item: T): Observable<T> {
      return this.httpClient
        .put<T>(`${this.url}/${this.endpoint}/${item.id}`,
          this.serializer.toJson(item))
        .pipe(map(data => this.serializer.fromJson(data) as T));
    }

    read(id: number): Observable<T> {
      return this.httpClient
        .get(`${this.url}/${this.endpoint}/${id}`)
        .pipe(map((data: any) => this.serializer.fromJson(data) as T));
    }

    list(queryOptions: any): Observable<T[]> {
      return this.httpClient
        .get(`${this.url}/${this.endpoint}?${queryOptions.toQueryString()}`)
        .pipe(map((data: any) => this.convertData(data.items)));
    }

    delete(id: number) {
      return this.httpClient
        .delete(`${this.url}/${this.endpoint}/${id}`);
    }

    private convertData(data: any): T[] {
      return data.map(item => this.serializer.fromJson(item));
    }
  }
