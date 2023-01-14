import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { AuthenticationDTO } from './dto';

@Injectable({})
export class AuthenticationService {
  // Dependency Injection of DatabaseService
  constructor(private databaseService: DatabaseService) {}

  signin() {
    console.log('SignIn Function Invoked');
    return 'Signed In';
  }

  signup(dto: AuthenticationDTO) {
    console.log('SignUp Function Invoked');
    return 'Signed Up';
  }
}
