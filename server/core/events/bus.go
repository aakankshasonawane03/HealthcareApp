package events

type EventBus struct {
	handlers map[string][]func(interface{})
}

func New() *EventBus {
	return &EventBus{
		handlers: make(map[string][]func(interface{})),
	}
}

func (b *EventBus) Publish(event string, payload interface{}) {
	for _, h := range b.handlers[event] {
		h(payload)
	}
}

func (b *EventBus) Subscribe(event string, handler func(interface{})) {
	b.handlers[event] = append(b.handlers[event], handler)
}
