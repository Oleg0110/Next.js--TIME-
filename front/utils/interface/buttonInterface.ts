export interface IButtonHoverBlock {
  id: string;
  name: string;
  link: string;
}

export interface IButtonProps {
  id: string;
  name: string;
  link?: string;
  hoverBlock: boolean;
  buttonsHoverArr?: IButtonHoverBlock[];
}
