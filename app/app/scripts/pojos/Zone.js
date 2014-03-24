var pitchfx = pitchfx ||
{};

/**
 * @class pitchfx.Zone
 * @classdesc a single zone represents a collection of pitches that live within
 *            the same square area as they crossed the plate.
 */
pitchfx.Zone = function()
{
    this.pitches = [];
};

/**
 * @param {pitchfx.Pitch}
 *            pitch - the pitch to add to the zone
 */
pitchfx.Zone.prototype.addPitch = function(pitch)
{
    this.pitches.push(pitch);
};

/**
 * Get the whiff rate across all pitches in this zone
 *
 * @returns {Number}
 */
pitchfx.Zone.prototype.getWhiffsPerSwingRate = function()
{
    var whiffs = 0,
        swings = 0;

    angular.forEach(this.pitches, function(pitch)
    {
        if (pitch.isSwing())
        {
            swings++;
        }
        if (pitch.isWhiff())
        {
            whiffs++;
        }
    });
    if (swings === 0)
    {
        return 0;
    }
    return whiffs / swings;
};

/**
 * Get the swing rate across all pitches in this zone
 *
 * @returns {Number}
 */
pitchfx.Zone.prototype.getSwingRate = function()
{
    var pitches = this.pitches.length,
        swings = 0;
    if (pitches === 0)
    {
        return 0;
    }

    angular.forEach(this.pitches, function(pitch)
    {
        if (pitch.isSwing())
        {
            swings++;
        }
    });
    return swings / pitches;
};
