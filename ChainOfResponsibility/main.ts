abstract class Handler {
    protected nextHandler: Handler | null = null;

    public setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    public abstract handle(order: Order): string | void;
}

type Order = {
    id: string;
    itemsInStock: boolean;
    paymentValid: boolean;
};

class StockHandler extends Handler {
    public handle(order: Order): string | void {
        if (order.itemsInStock) {
            console.log(`StockHandler: Pedido '${order.id}' - Itens em estoque.`);
            if (this.nextHandler) {
                return this.nextHandler.handle(order);
            }
        } else {
            return `StockHandler: Pedido '${order.id}' não pode ser processado, itens fora de estoque.`;
        }
    }
}

class PaymentHandler extends Handler {
    public handle(order: Order): string | void {
        if (order.paymentValid) {
            console.log(`PaymentHandler: Pedido '${order.id}' - Pagamento validado.`);
            if (this.nextHandler) {
                return this.nextHandler.handle(order);
            }
        } else {
            return `PaymentHandler: Pedido '${order.id}' falhou na validação de pagamento.`;
        }
    }
}

class DeliveryHandler extends Handler {
    public handle(order: Order): string | void {
        console.log(`DeliveryHandler: Pedido '${order.id}' foi enviado para entrega!`);
        return `DeliveryHandler: Pedido '${order.id}' processado com sucesso!`;
    }
}

const stockHandler = new StockHandler();
const paymentHandler = new PaymentHandler();
const deliveryHandler = new DeliveryHandler();

stockHandler.setNext(paymentHandler).setNext(deliveryHandler);

const orders: Order[] = [
    { id: "A001", itemsInStock: true, paymentValid: true },
    { id: "A002", itemsInStock: false, paymentValid: true },
    { id: "A003", itemsInStock: true, paymentValid: false },
];

orders.forEach((order) => {
    console.log("\nProcessando pedido...");
    const result = stockHandler.handle(order);
    if (result) {
        console.log(result);
    }
});
