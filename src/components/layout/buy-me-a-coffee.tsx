
"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { CoffeeIcon } from '../icons/coffee-icon';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { cn } from '@/lib/utils';

const donationSchema = z.object({
  amount: z.coerce.number().min(1, { message: 'Minimum donation is $1.' }),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const BuyMeACoffee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down hide the navbar
          setIsVisible(false);
        } else { // if scroll up show the navbar
          setIsVisible(true);
        }
        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 5,
    },
  });

  const onSubmit = (data: DonationFormValues) => {
    console.log('Donation submitted:', data);
    toast({
      title: 'Thank You for Your Support!',
      description: `We've received your generous $${data.amount} contribution.`,
    });
    setIsOpen(false);
    form.reset();
  };

  const setAmount = (amount: number) => {
    form.setValue('amount', amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className={cn("fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-foreground bg-background/80 border rounded-full shadow-lg backdrop-blur-sm hover:bg-accent transition-all duration-300 group", {
            'opacity-0 translate-y-[-20px] pointer-events-none': !isVisible,
            'opacity-100 translate-y-0': isVisible
        })}>
          <CoffeeIcon className="w-6 h-6 text-primary" />
          <span className="hidden sm:inline">Buy me a coffee</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CoffeeIcon className="w-6 h-6 text-primary" />
            Buy me a coffee
          </DialogTitle>
          <DialogDescription>
            If you like this app, consider supporting its development. Every contribution is appreciated!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-3 gap-2">
                {[3, 5, 10].map(amount => (
                    <Button
                        key={amount}
                        type="button"
                        variant={form.watch('amount') === amount ? 'default' : 'outline'}
                        onClick={() => setAmount(amount)}
                    >
                        ${amount}
                    </Button>
                ))}
            </div>
            
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Custom Amount ($)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">$</span>
                      <Input
                        type="number"
                        placeholder="Enter amount"
                        className="pl-7"
                        min="1"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" className="w-full">
                Support with ${form.watch('amount') || 0}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BuyMeACoffee;
