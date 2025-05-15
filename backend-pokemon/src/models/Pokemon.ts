import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType } from 'sequelize-typescript';

interface PokemonAttributes {
  id?: number;
  tipo: string;
  treinador: string;
  nivel: number;
}

@Table
export class Pokemon extends Model<PokemonAttributes> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    tipo!: string;

    @Column(DataType.STRING)
    treinador!: string;

    @Column(DataType.INTEGER)
    nivel!: number;
}

export default Pokemon;