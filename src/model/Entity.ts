import { Auto, AutoListing } from './Auto';
import { Persona, PersonaListing } from './Persona';

export type EntityListing = PersonaListing | AutoListing;

export type Entity = Persona | Auto;
