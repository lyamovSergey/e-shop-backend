import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderDto } from './dto/order.dto';
import { StripeService } from 'src/stripe/stripe.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stripeService: StripeService,
    private readonly configService: ConfigService,
  ) {}

  async createPayment(dto: OrderDto, userId: string) {
    const orderItems = dto.items.map((item) => ({
      quantity: item.quantity,
      price: item.price,
      product: {
        connect: {
          id: item.productId,
        },
      },
      store: {
        connect: {
          id: item.storeId,
        },
      },
    }));

    const total = dto.items.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);

    const order = await this.prisma.order.create({
      data: {
        status: dto.status,
        items: {
          create: orderItems,
        },
        total,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const payment = this.stripeService.client.checkout.sessions.create({
      mode: 'payment',
      line_items: dto.items.map((item) => ({
        price_data: {
          currency: 'uah',
          product_data: {
            name: item.title,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      success_url: `${this.configService.get('CLIENT_URL')}/payment/success`,
      cancel_url: `${this.configService.get('CLIENT_URL')}/cart`,
      metadata: {
        orderId: order.id,
      },
    });
    return payment;
  }
  async createPaymentTest() {
    const payment = this.stripeService.client.paymentIntents.create({
      amount: 20000,
      currency: 'uah',
    });
    return payment;
  }
}
