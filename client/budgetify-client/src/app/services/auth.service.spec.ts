import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { BASE_URL } from '../shared/constants/constants';
const token: Object = {
  token: 'some token',
  expiresIn: '1h',
};
describe('AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
  });
  service = TestBed.inject(AuthService);
  httpController = TestBed.inject(HttpTestingController);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return user data', (done: DoneFn) => {
    service.login('email', 'password').subscribe({
      next: (result) => {
        expect(result).toEqual(token);
        done();
      },
    });
  });

  const req = httpController.expectOne({
    method: 'POST',
    url: `${BASE_URL}/login`,
  });

  req.flush(token);
  it('should call setToken successfully', (done: DoneFn) => {
    spyOn(service as any, 'setToken');

    service.login('email', 'password').subscribe(() => {
      expect((service as any).setToken).toHaveBeenCalledOnceWith(token);
      done();
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${BASE_URL}/login`,
    });

    req.flush(token);
  });
  it('should not call setToken with error', (done: DoneFn) => {
    spyOn(service as any, 'setToken');

    service.login('mekhrullaeva@gmail.com', 'Adulvam28.07').subscribe({
      error: () => {
        expect((service as any).setToken).not.toHaveBeenCalled();
        done();
      },
    });

    const req = httpController.expectOne({
      method: 'POST',
      url: `${BASE_URL}/login`,
    });

    req.error(new ProgressEvent('401'));
  });
  it('should call logout', () => {
    spyOn(localStorage, 'removeItem');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith('token');
  });
});
