var b2Vec2 = Box2D.b2Vec2
  , b2BodyDef = Box2D.b2BodyDef
  , b2Body = Box2D.b2Body
  , b2PolygonShape = Box2D.b2PolygonShape
  , b2CircleShape = Box2D.b2CircleShape
  , b2World = Box2D.b2World;

var world;

function init() {
  var gravity = new b2Vec2(0.0, -10.0);
  world = new b2World(gravity, true);

  var bd = new b2BodyDef();

  // Create a stick body
  bd.set_type(Box2D.b2_staticBody);
  bd.set_position(new b2Vec2(0.0, 0.0));
  var stick = world.CreateBody(bd);

  // Attach a rectangle fixture to the stick
  var rect = new b2PolygonShape();
  rect.SetAsBox(0.5, 10.0, new b2Vec2(0.0, 0.0), 70.0 * Math.PI / 180.0);
  stick.CreateFixture(rect, 0.0);

  // Create a ball body
  bd.set_type(Box2D.b2_dynamicBody);
  bd.set_position(new b2Vec2(0.0, 20.0));
  var ball = world.CreateBody(bd);

  // Attach a circle fixture to the ball
  var circle = new b2CircleShape();
  circle.set_m_radius(2.0);
  ball.CreateFixture(circle, 5.0);
}

function step() {
  world.Step(1 / 60, 3, 3);
}

