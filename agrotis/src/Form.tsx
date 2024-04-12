import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@material-ui/core';
import styled from 'styled-components';
import axios from 'axios';

interface Propriedade {
  id: number;
  nome: string;
  cnpj: string;
}

interface Laboratorio {
  id: number;
  nome: string;
}

interface FormData {
  nome: string;
  dataInicial: string;
  dataFinal: string;
  infosPropriedade: Propriedade;
  cnpj: string;
  laboratorio: Laboratorio;
  observacoes: string;
}

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  margin: 0 auto;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const HalfWidthField = styled(TextField)`
  flex: 1;
`;


const Form = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>();
  const [propriedades, setPropriedades] = useState<Propriedade[]>([]);
  const [laboratorios, setLaboratorios] = useState<Laboratorio[]>([]);

  useEffect(() => {
    const fetchPropriedades = async () => {
      const response = await axios.get('https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/propriedades.json');
      setPropriedades(response.data);
    };

    const fetchLaboratorios = async () => {
      const response = await axios.get('https://bitbucket.org/agrotis/teste-rh/raw/3bc797776e54586552d1c9666fd7c13366fc9548/teste-front-end-1/laboratorios.json');
      setLaboratorios(response.data);
    };

    fetchPropriedades();
    fetchLaboratorios();
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <HalfWidthField {...register('nome')} label="Nome" variant="standard" />
        <HalfWidthField {...register('dataInicial')} label="Data Inicial" variant="standard" type="date" InputLabelProps={{ shrink: true }} style={{'width':'40px'}}/>
        <HalfWidthField {...register('dataFinal')} label="Data Final" variant="standard" type="date" InputLabelProps={{ shrink: true }} />
      </Row>
      <Row>
        <FormControl variant="standard" style={{ flex: 1 }}>
          <InputLabel id="propriedade-label">Propriedade</InputLabel>
          <Select {...register('infosPropriedade.id')} labelId="propriedade-label" label="Propriedade" onChange={(e) => {
            const selectedPropriedade = propriedades.find(p => p.id === e.target.value);
            if (selectedPropriedade) {
              setValue('infosPropriedade', selectedPropriedade);
            }
          }}>
            {propriedades.map((propriedade) => (
              <MenuItem key={propriedade.id} value={propriedade.id}>{propriedade.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="standard" style={{ flex: 1 }}>
          <InputLabel id="laboratorio-label">Laboratório</InputLabel>
          <Select {...register('laboratorio.id')} labelId="laboratorio-label" label="Laboratório" onChange={(e) => {
            const selectedLaboratorio = laboratorios.find(l => l.id === e.target.value);
            if (selectedLaboratorio) {
              setValue('laboratorio', selectedLaboratorio);
            }
          }}>
            {laboratorios.map((laboratorio) => (
              <MenuItem key={laboratorio.id} value={laboratorio.id}>{laboratorio.nome}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Row>
      <TextField {...register('observacoes')} label="Observações" variant="standard" multiline rows={4} fullWidth />
      <Button type="submit" variant="contained" color="primary">Salvar</Button>
    </FormWrapper>
  );
};

export default Form;



