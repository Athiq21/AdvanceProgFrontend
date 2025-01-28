interface CreateItemRequestDTO {
    name: string;
    description: string;
    color:string;
    mileage:string;
    transmission:string;
    fueltype:string;
    price:string;
    category: { id: number }; 
    subCategory?: { id: number }; 
    blob: File;
  }
  