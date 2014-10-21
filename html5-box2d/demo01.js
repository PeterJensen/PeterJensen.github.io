var b2Vec2 = Box2D.Common.Math.b2Vec2
  , b2BodyDef = Box2D.Dynamics.b2BodyDef
  , b2Body = Box2D.Dynamics.b2Body
  , b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape
  , b2CircleShape = Box2D.Collision.Shapes.b2CircleShape
  , b2World = Box2D.Dynamics.b2World
  , b2Math = Box2D.Common.Math.b2Math;

var world;

function init() {
  var gravity = new b2Vec2(0, -10);
  world = new b2World(gravity, true);

  var bd = new b2BodyDef();

  // Create a stick body
  bd.type = b2Body.b2_staticBody;
  bd.position.Set(0.0, 0.0);
  var stick = world.CreateBody(bd);

  // Attach a rectangle fixture to the stick
  var rect = new b2PolygonShape();
  rect.SetAsOrientedBox(0.5, 10.0, new b2Vec2(0.0, 0.0), 70.0 * Math.PI / 180.0);
  stick.CreateFixture2(rect, 0.0);

  // Create a ball body
  bd.type = b2Body.b2_dynamicBody;
  bd.position.Set(0.0, 20.0);
  var ball = world.CreateBody(bd);

  // Attach a circle fixture to the ball
  var circle = new b2CircleShape();
  circle.m_radius = 2.0;
  ball.CreateFixture2(circle, 5.0);
}

function step() {
  world.Step(1 / 120, 3, 3);
}
