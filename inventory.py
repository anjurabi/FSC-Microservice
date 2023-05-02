from flask import Flask, jsonify, request

app = Flask(__name__)

# Inventory database (in-memory)
inventory = {
    'tomatoes': 20,
    'cheese': 10,
    'pepperoni': 5,
    'dough': 15,
}

@app.route('/inventory', methods=['GET'])
def get_inventory():
    # Return the current inventory
    return jsonify(inventory)

@app.route('/inventory/{item}', methods=['GET'])
def get_inventory_item(item):
    # Return the quantity of a specific inventory item
    if item in inventory:
        return jsonify({item: inventory[item]})
    else:
        return jsonify({'error': 'Item not found'})

@app.route('/inventory', methods=['POST'])
def add_inventory():
    # Add new inventory item(s) to the inventory
    items = request.json
    for item in items:
        if item in inventory:
            inventory[item] += items[item]
        else:
            inventory[item] = items[item]
    return jsonify({'message': 'Inventory updated'})

@app.route('/inventory/{item}', methods=['PUT'])
def update_inventory_item(item):
    # Update the quantity of a specific inventory item
    if item in inventory:
        quantity = request.json['quantity']
        inventory[item] = quantity
        return jsonify({'message': 'Inventory updated'})
    else:
        return jsonify({'error': 'Item not found'})

if __name__ == '__main__':
    app.run(debug=True)
