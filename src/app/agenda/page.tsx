"use client";

import NavBar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Plus, CalendarIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Agenda de tarefas com datas e tarefas associadas
const agendaTarefas = [
  { data: "2024-11-25", tasks: ["Audiência de Maria Joaquina - 15 horas"] },
  { data: "2024-11-26", tasks: ["Audiência de Hugo - 14 horas"] },
  { data: "2024-11-27", tasks: ["Audiência de Marta - 10 horas"] },
  { data: "2024-11-28", tasks: ["Audiência de Carlos - 09 horas"] },
  { data: "2024-11-29", tasks: ["Audiência de Julia - 11 horas"] },
  { data: "2024-11-30", tasks: ["Audiência de Renato - 13 horas"] },
  { data: "2024-12-01", tasks: ["Audiência de Fernanda - 08 horas"] },
  { data: "2024-12-02", tasks: ["Audiência de Eduardo - 14 horas"] },
  { data: "2024-12-03", tasks: ["Audiência de Roberto - 16 horas"] },
  { data: "2024-12-04", tasks: ["Audiência de Sonia - 10 horas"] },
  { data: "2024-12-05", tasks: ["Audiência de Pedro - 15 horas"] },
  { data: "2024-12-06", tasks: ["Audiência de Clara - 17 horas"] },
  { data: "2024-12-07", tasks: ["Audiência de Paula - 11 horas"] },
];

// Validação com Zod para garantir que a data seja válida
const FormSchema = z.object({
  dob: z.date({ required_error: "A data é obrigatória." }),
});

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const carouselRef = useRef<HTMLDivElement>(null);

  // UseEffect para rolar até o evento correto no carrossel quando a data for selecionada
  useEffect(() => {
    if (selectedDate && carouselRef.current) {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const index = agendaTarefas.findIndex((dia) => dia.data === formattedDate);
      
      if (index >= 0) {
        const carouselItems = carouselRef.current.querySelectorAll('.carousel-item');
        const scrollTo = carouselItems[index] as HTMLElement;
        if (scrollTo) {
          // Adicionando `behavior: "smooth"` e `block: "center"` para garantir que o card fique centralizado
          scrollTo.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  }, [selectedDate]);

  return (
    <main className="h-screen flex flex-col">
      {/* Barra de navegação */}
      <NavBar
        nome="Agenda"
        botaoAdiconar={
          <Button size="icon" variant="outline" className="bg-green-500 hover:bg-green-600">
            <Plus className="text-white" />
          </Button>
        }
      />

      {/* Botão do calendário */}
      <section className="flex justify-center my-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[240px] text-center">
              {selectedDate ? format(selectedDate, "PPP") : "Escolha uma data"}
              <CalendarIcon className="ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="center">
            <Calendar
              mode="single"
              selected={selectedDate ?? undefined} // Garantir que seja undefined quando selectedDate for null
              onSelect={(date) => {
                // Verificação para garantir que date seja do tipo Date ou null
                setSelectedDate(date ?? null);
              }}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </section>

      {/* Carrossel da Agenda */}
      <section className="flex-grow flex justify-center items-center p-4">
        <div ref={carouselRef} className="relative w-full max-w-5xl overflow-hidden">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg" />
            <CarouselContent className="flex gap-4">
              {agendaTarefas.map((dia, index) => (
                <CarouselItem key={index} className="carousel-item basis-full sm:basis-1/2 md:basis-1/3 max-w-sm">
                  <Card className="max-w-sm mx-auto h-48">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-gray-800">
                        {format(new Date(dia.data), "PPP")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {dia.tasks.map((task, idx) => (
                        <div key={idx} className="text-sm text-gray-600 py-1">
                          {task}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-lg" />
          </Carousel>
        </div>
      </section>
    </main>
  );
}
