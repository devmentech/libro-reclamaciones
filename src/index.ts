// Componente principal
export { LibroReclamaciones } from './components/LibroReclamaciones';
export type { LibroReclamacionesProps } from './components/LibroReclamaciones';

// Componentes auxiliares
export { IssueDate } from './components/IssueDate';
export { UploadSignature } from './components/UploadSignature';
export { DrawSignature } from './components/DrawSignature';
export { Captcha } from './components/Captcha';

// Componentes UI
export { Button } from './components/ui/button';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
export { Textarea } from './components/ui/textarea';
export { Checkbox } from './components/ui/checkbox';
export { Calendar } from './components/ui/calendar';
export { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';

// Tipos
export type { 
  ProductDTO, 
  ProductsResponseDTO, 
  ComplaintsFormConfig, 
  ComplaintFormData 
} from './types';

// Utilidades
export { cn, xor, parseStringToBoolean } from './lib/utils';

// Estilos (se debe importar separadamente en el proyecto consumidor)
// import '@devmentech/libro-reclamaciones/dist/styles.css'
