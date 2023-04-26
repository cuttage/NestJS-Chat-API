import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { ChatModule } from '../src/chat.module';

describe('ChatController (e2e)', () => {
  let app: any;
  let server: any;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ChatModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/chat (GET)', () => {
    it('should redirect to /chat', (done) => {
      request(server)
        .get('/')
        .expect(302)
        .expect('Location', '/chat')
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
