import { Price } from '../../utils/interfaces/price';


export class PriceHelper {

	static numberToBRL(value: number): string {
		return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
	}

	static splitNumber(value: string): string[] {
		return value.split(',');
	}

	static brlToNumber(value: string): number {
		
		value = value.replace(/[R$\s]+/g, '');
		value = value.replace(/\./g, '');
		value = value.replace(',', '.');
		return parseFloat(value);
	}

}
