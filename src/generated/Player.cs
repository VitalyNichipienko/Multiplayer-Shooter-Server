// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 1.0.46
// 

using Colyseus.Schema;

public partial class Player : Schema {
	[Type(0, "number")]
	public float positionX = default(float);

	[Type(1, "number")]
	public float positionY = default(float);

	[Type(2, "number")]
	public float positionZ = default(float);

	[Type(3, "number")]
	public float velocityX = default(float);

	[Type(4, "number")]
	public float velocityY = default(float);

	[Type(5, "number")]
	public float velocityZ = default(float);
}

