import { DomSanitizer } from '@angular/platform-browser';
import { DiaHora } from './components/dias-semana-select/dia-hora';
import { DiaHoraAtividade } from './models/diaHora';

export class AppUtils {
  static obterDiaHoraEdit(horarios?: DiaHoraAtividade[]): DiaHora | undefined {
    if (horarios && horarios.length > 0) {
      return {
        diasSelecionado: horarios.map((x) => x.dia),
        hora_inicio: horarios[0].hora_inicio,
        hora_fim: horarios[0].hora_fim,
      };
    } else {
      return undefined;
    }
  }

  static imageSanitizer(image: string, sanitizer: DomSanitizer) {
    return sanitizer.bypassSecurityTrustResourceUrl(image);
  }
}
