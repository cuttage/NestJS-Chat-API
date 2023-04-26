import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Redirect')
@Controller()
export class RedirectController {
  @Get()
  @Redirect('/chat', 302)
  redirectToChat() {}
}
