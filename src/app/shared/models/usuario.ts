export interface Usuario {
  id: number;
  nome: string;
  estado?: string;
  cidade?: string;
  email: string;
  universidade?: string;
  curso?: string;
  nivel?: string;
  tamanho_camisa?: string;
  genero?: string;
  url_foto_perfil?: string;
  id_google?: string;
  perfil?: PerfilUsuario;
  perfil_usuario?: number;
  permissoes?: string[];
  accessToken?: string;
  instituto?: string;
}

export type PerfilUsuario = 'adm' | 'aluno';
