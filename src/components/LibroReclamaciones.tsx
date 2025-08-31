"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";

import { ComplaintsFormConfig, ProductDTO, ComplaintFormData } from "../types";
import { IssueDate } from "./IssueDate";
import { UploadSignature } from "./UploadSignature";
import { Captcha } from "./Captcha";

export interface LibroReclamacionesProps extends ComplaintsFormConfig {
  className?: string;
  onSubmit?: (data: ComplaintFormData) => void | Promise<void>;
  onDataChange?: (data: Partial<ComplaintFormData>) => void;
}

export const LibroReclamaciones: React.FC<LibroReclamacionesProps> = ({
  className,
  companyName,
  formTitle,
  formSubtitle,
  currency,
  responseTime,
  recaptcha,
  productsEndpoint,
  products: initialProducts,
  onSubmit,
  onDataChange,
}) => {
  const [products, setProducts] = useState<ProductDTO[]>(initialProducts || []);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [isMinor, setIsMinor] = useState(false);
  const [formData, setFormData] = useState<Partial<ComplaintFormData>>({});
  const [loading, setLoading] = useState(false);

  // Cargar productos si se proporciona un endpoint
  useEffect(() => {
    if (productsEndpoint && !initialProducts) {
      fetch(productsEndpoint)
        .then(res => res.json())
        .then(data => {
          if (data.products) {
            setProducts(data.products);
          }
        })
        .catch(err => console.error('Error loading products:', err));
    }
  }, [productsEndpoint, initialProducts]);

  // Notificar cambios en los datos del formulario
  useEffect(() => {
    if (onDataChange) {
      onDataChange(formData);
    }
  }, [formData, onDataChange]);

  const updateFormData = (field: keyof ComplaintFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (recaptcha.enabled && !captchaValid) {
      alert("Por favor, complete el captcha");
      return;
    }

    setLoading(true);
    
    try {
      const formElement = event.currentTarget;
      const formDataObj = new FormData(formElement);
      
      const complaintData: ComplaintFormData = {
        fullName: formDataObj.get('fullName') as string,
        address: formDataObj.get('address') as string,
        id: formDataObj.get('id') as string,
        phone: formDataObj.get('phone') as string,
        email: formDataObj.get('email') as string,
        isMinor,
        guardian: isMinor ? formDataObj.get('guardian') as string : undefined,
        productId: formDataObj.get('product') as string,
        amount: parseFloat(formDataObj.get('amount') as string),
        incidentDate: formData.incidentDate || new Date(),
        type: (formDataObj.get('type') as 'reclamo' | 'queja') || 'reclamo',
        details: formDataObj.get('details') as string,
        request: formDataObj.get('request') as string,
        signature: formData.signature,
      };

      if (onSubmit) {
        await onSubmit(complaintData);
      }
    } catch (error) {
      console.error('Error submitting complaint:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`libro-reclamaciones-container ${className || ''}`}>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>
            {formTitle} - {companyName}
          </CardTitle>
          <CardDescription>
            {formSubtitle}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo</Label>
                <Input 
                  id="fullName" 
                  name="fullName"
                  required 
                  onChange={(e) => updateFormData('fullName', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Domicilio</Label>
                <Input 
                  id="address" 
                  name="address"
                  required 
                  onChange={(e) => updateFormData('address', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="id">DNI / CE</Label>
                <Input 
                  id="id" 
                  name="id"
                  required 
                  onChange={(e) => updateFormData('id', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono</Label>
                <Input 
                  id="phone" 
                  name="phone"
                  type="tel" 
                  required 
                  onChange={(e) => updateFormData('phone', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  required 
                  onChange={(e) => updateFormData('email', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isMinor" 
                    checked={isMinor} 
                    onCheckedChange={(checked) => {
                      const value = checked === true;
                      setIsMinor(value);
                      updateFormData('isMinor', value);
                    }} 
                  />
                  <Label htmlFor="isMinor">Es menor de edad</Label>
                </div>
              </div>
              {isMinor && (
                <div className="space-y-2">
                  <Label htmlFor="guardian">Padre o Madre</Label>
                  <Input 
                    id="guardian" 
                    name="guardian"
                    required={isMinor} 
                    onChange={(e) => updateFormData('guardian', e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Producto o Servicio</Label>
              <Select name="product" onValueChange={(value) => updateFormData('productId', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione producto o servicio" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product: ProductDTO) => (
                    <SelectItem key={product.id} value={product.id.toString()}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Monto Reclamado ({currency.name})</Label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  {currency.symbol}
                </span>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  className="pl-8"
                  onChange={(e) => updateFormData('amount', parseFloat(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <IssueDate 
                onDateChange={(date) => updateFormData('incidentDate', date)}
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo</Label>
              <RadioGroup 
                defaultValue="reclamo" 
                name="type"
                onValueChange={(value) => updateFormData('type', value as 'reclamo' | 'queja')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="reclamo" id="reclamo" />
                  <Label htmlFor="reclamo">
                    Reclamo (Disconformidad con productos o servicios)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="queja" id="queja" />
                  <Label htmlFor="queja">
                    Queja (Disconformidad con la atención al cliente)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Detalle</Label>
              <Textarea 
                id="details" 
                name="details"
                required 
                onChange={(e) => updateFormData('details', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="request">Pedido del Consumidor</Label>
              <Textarea 
                id="request" 
                name="request"
                required 
                onChange={(e) => updateFormData('request', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <UploadSignature 
                onSignatureChange={(signature) => updateFormData('signature', signature)}
              />
            </div>

            <div className="text-sm text-gray-500">
              <p>
                Nota: La formulación del reclamo no impide acudir a otras vías de
                solución de controversias ni es requisito previo para interponer
                una denuncia ante el INDECOPI.
              </p>
              <p>
                El proveedor debe dar respuesta al reclamo en un plazo no mayor a{" "}
                {responseTime} días calendario.
              </p>
            </div>

            {recaptcha.enabled && (
              <Captcha recaptcha={recaptcha} setCaptchaValid={setCaptchaValid} />
            )}

            <CardFooter className="px-0">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Enviando..." : "Enviar Reclamo"}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
