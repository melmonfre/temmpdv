import React from 'react';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface MaskedInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  mask?: 'phone' | 'cpf' | 'cnpj' | 'cep' | 'currency';
  value: string;
  onChange: (value: string) => void;
}

export function MaskedInput({ 
  mask, 
  value, 
  onChange, 
  className,
  ...props 
}: MaskedInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\D/g, '');

    switch (mask) {
      case 'phone':
        if (newValue.length <= 11) {
          newValue = newValue.replace(/^(\d{2})(\d)/g, '($1) $2');
          newValue = newValue.replace(/(\d)(\d{4})$/, '$1-$2');
        }
        break;
      case 'cpf':
        newValue = newValue.replace(/(\d{3})(\d)/, '$1.$2');
        newValue = newValue.replace(/(\d{3})(\d)/, '$1.$2');
        newValue = newValue.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        break;
      case 'cnpj':
        newValue = newValue.replace(/^(\d{2})(\d)/, '$1.$2');
        newValue = newValue.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
        newValue = newValue.replace(/\.(\d{3})(\d)/, '.$1/$2');
        newValue = newValue.replace(/(\d{4})(\d)/, '$1-$2');
        break;
      case 'cep':
        newValue = newValue.replace(/^(\d{5})(\d)/, '$1-$2');
        break;
      case 'currency':
        newValue = (Number(newValue) / 100).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
        break;
    }

    onChange(newValue);
  };

  return (
    <Input
      value={value}
      onChange={handleChange}
      className={cn("font-mono", className)}
      {...props}
    />
  );
}