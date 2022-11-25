import { Injectable } from '@nestjs/common';
import { UsuarioService} from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
const bcrypt = require('bcrypt');

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService,
    ) { }
    async validateUser(email: string, senha: string): Promise<any> {
        const user = await this.usuarioService.findByEmail(email);
        if(user && await bcrypt.compare(senha, user.senha)) {
            const { senha, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
